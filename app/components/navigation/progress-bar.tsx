import { useEffect } from "react";

import NProgress from "nprogress"

import "nprogress/nprogress.css";
import { useNavigation } from "react-router";

NProgress.configure({
    showSpinner: true,
    easing: 'ease'
});

export default function ProgressBar() {
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "loading") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [navigation.state]);

    return null;
}
