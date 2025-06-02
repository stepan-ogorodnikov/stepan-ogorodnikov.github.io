import appReducer, { appControlsToggled } from "@/store/app-slice";
import dataReducer, { pageDataSet, pageDataUpdated, scriptSet, ScriptSetPayload } from "@/store/data-slice";
import navReducer from "@/store/nav-slice";
import { isAnyOf } from "@reduxjs/toolkit";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(scriptSet, appControlsToggled),
  effect: async ({ type, payload }, listenerApi) => {
    const { getState, dispatch, cancelActiveListeners, fork, cancel } = listenerApi;
    const state = <RootState> getState();
    // if user disables animation, cancel page script and apply nomotion state
    if (type == "app/appControlsToggled") {
      if (!state.app.appControls.isMotionOn) {
        // cancel page script execution
        cancelActiveListeners();
        dispatch(pageDataSet(state.data.noMotionData));
      }
    }
    // after page script is set, execute script or apply no-motion state
    if (type == "data/scriptSet") {
      cancelActiveListeners();
      const { script, noMotionData } = payload as ScriptSetPayload["payload"];
      if (state.app.appControls.isMotionOn) {
        // execute script if motion is on
        for await (const currentSrciptItem of script) {
          const { pageData = {}, delay: scriptItemDelay } = currentSrciptItem;
          dispatch(pageDataUpdated(pageData));
          // apply script item's delay
          const delayTask = fork(async ({ delay }) => {
            // motion values are in seconds, delay expects microsends
            await delay(scriptItemDelay * 1000);
            return true;
          });
          // cancel the whole script if something goes wrong
          const result = await delayTask.result;
          if (result.status != "ok") cancel();
        }
      } else {
        // apply no-motion state if motion is off
        dispatch(pageDataSet(noMotionData));
      }
    }
  },
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    nav: navReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
