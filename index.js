function notifyUser(message) {

    if (!("Notification" in window)) {
        console.warn("[QXUEYOU] 当前浏览器不支持桌面通知");
        return;
    }
    if (Notification.permission === "granted") {
        if (!notifiedAuthPrompt) {
            console.warn("[QXUEYOU] 正在发送通知，等待延时 Notification.permission===granted");
            sleep(10000, 15000);
            new Notification("自动学习提醒", { body: message, silent: false });
            notifiedAuthPrompt = true;
        }
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted" && !notifiedAuthPrompt) {
                new Notification("自动学习提醒", { body: message, silent: false });
                notifiedAuthPrompt = true;
            }
        });
    }
    else {
        console.warn("[QXUEYOU] 正在发送通知，等待延时");
        sleep(10000, 15000);
        new Notification("自动学习提醒", { body: message, silent: false });
        notifiedAuthPrompt = true;
        console.warn("[QXUEYOU] 已发送通知");
    }
}