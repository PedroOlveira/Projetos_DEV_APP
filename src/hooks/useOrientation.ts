import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export type OrientationMode = "portrait" | "landscape";

export default function useOrientation() {
  const [mode, setMode] = useState<OrientationMode>("portrait");

  useEffect(() => {
    let subscription: any;

    const assign = (o: ScreenOrientation.Orientation) => {
      if (o === ScreenOrientation.Orientation.PORTRAIT_UP ||
          o === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
        setMode("portrait");
      } else if (o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
                 o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setMode("landscape");
      }
    };

    (async () => {
      const initial = await ScreenOrientation.getOrientationAsync();
      assign(initial);
      subscription = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
        assign(orientationInfo.orientation);
      });
    })();

    return () => {
      if (subscription) ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return mode;
}