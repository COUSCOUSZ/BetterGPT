export const waitFor = (selector) => {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};

export const waitForThem = (selector) => {
    return new Promise((resolve) => {
        let x = document.querySelectorAll(selector);
        console.log("xxxxxxxxxxxxxxxxx");
        console.log(x);
        if (x) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver((mutations) => {
            let z = document.querySelectorAll(selector);
            console.log("zzzzzzzzzzzzzzzz");
            console.log(z);
            if (document.querySelectorAll(selector)) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};
