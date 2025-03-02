// scroll to a specific message
export function scrollTo(id: string) {
    // console.log(id);
    document
        .querySelector(`[data-id="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function patternToRegex(pattern: string): RegExp {
    const regexString = pattern
        .replace(/\*/g, ".*") // Replace '*' with '.*' to match any characters
        .replace(/:\/\//g, "://"); // Keep '://' as is
    return new RegExp(`^${regexString}$`);
}

export function isUrlMatching(url: string, patterns: string[]): boolean {
    return patterns.some((pattern) => patternToRegex(pattern).test(url));
}
