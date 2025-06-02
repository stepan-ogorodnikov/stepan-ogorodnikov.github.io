import { type Animation } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentFileAsDone } from "@/store/nav-slice";
import { MotionProps } from "motion/react";
import { useEffect, useState } from "react";

type AnimationsData = Record<string, Animation>;
type PageData = Record<string, MotionProps>;

export function usePage(
  animations: AnimationsData,
) {
  const dispatch = useAppDispatch();
  const isMotionOn = useAppSelector(state => state.app.appControls.isMotionOn);
  const isDone = useAppSelector(state => state.nav.isDone);
  const [animationsData, setAnimationsData] = useState<AnimationsData>(animations);
  const [data, setData] = useState<PageData>(getInitialPageData(animations, isMotionOn, isDone));

  // this effect converts animations to no-motion versions, when user disables motion
  useEffect(() => {
    if (!isMotionOn) {
      let newData: PageData = {};
      Object.keys(animationsData).forEach((key) => {
        Object.assign(newData, { [key]: animationsData[key](isMotionOn, false) });
      });
      setData(newData);
    }
  }, [isMotionOn]);

  // starts animation that is present in animationData state
  const startAnimation = (keys: string | string[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    let animations: PageData = {};
    keysArray.forEach((key) => {
      if (animationsData[key]) {
        const props = animationsData[key](isMotionOn, isDone);
        Object.assign(animations, { [key]: props });
      }
    });
    setData((prev) => ({ ...prev, ...animations }));
  };

  // upserts animation into animationData state and starts it
  const updateAnimation = (data: AnimationsData) => {
    setAnimationsData((prev) => ({ ...prev, ...data }));
    let newData = {};
    Object.keys(data).forEach((item) => {
      Object.assign(newData, { [item]: data[item](isMotionOn, isDone) });
    });
    setData((prev) => ({ ...prev, ...newData }));
  };

  const setIsDone = () => {
    dispatch(setCurrentFileAsDone());
  };

  return { data, startAnimation, updateAnimation, isDone, setIsDone };
}

function getInitialPageData(initialData: AnimationsData, isMotionOn?: boolean, isDone?: boolean) {
  let data: PageData = {};
  Object.keys(initialData).forEach((key) => {
    Object.assign(data, { [key]: getInitialMotionProps(initialData[key](isMotionOn, isDone)) });
  });
  return data;
}

function getInitialMotionProps({ initial }: MotionProps) {
  return initial ? { initial } : {};
}
