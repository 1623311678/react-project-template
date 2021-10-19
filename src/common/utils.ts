export const maybe = <T>(exp: () => T, d?: T) => {
    try {
        const result = exp();
        return result === undefined ? d : result;
    } catch {
        return d;
    }
};

// 获取YouTuBe视频id

export const getYtbVideoId = (url) => {
    /** Youtube 视频链接格式
     * https://www.youtube.com/embed/GlVvVpZwcS4
     * https://youtu.be/GlVvVpZwcS4
     * https://www.youtube.com/watch?v=GlVvVpZwcS4
     */
    let opts = { fuzzy: true };
    if (/youtu\.?be/.test(url)) {
        // Look first for known patterns
        let i;
        let patterns = [
            /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
            /\?v=([^#\&\?]{11})/,         // ?v=<id>
            /\&v=([^#\&\?]{11})/,         // &v=<id>
            /embed\/([^#\&\?]{11})/,      // embed/<id>
            /\/v\/([^#\&\?]{11})/         // /v/<id>
        ];
        // If any pattern matches, return the ID
        for (i = 0; i < patterns.length; ++i) {
            if (patterns[i].test(url)) {
                return patterns[i].exec(url)[1];
            }
        }
        if (opts.fuzzy) {
            // If that fails, break it apart by certain characters and look
            // for the 11 character key
            let tokens = url.split(/[\/\&\?=#\.\s]/g);
            for (i = 0; i < tokens.length; ++i) {
                if (/^[^#\&\?]{11}$/.test(tokens[i])) {
                    return tokens[i];
                }
            }
        }
    }
    return null;
};
// 转换成后端接口接收的ytb视频格式
export const youtubeToAjax = (ytbId) => {
    return `https://www.youtube.com/watch?v=${ytbId}`;
}
// 转换成iframe播放的ytb视频格式
export const youtubeToIframe = (ytbId) => {
    return `https://www.youtube.com/embed/${ytbId}?controls=1&autoplay=1&loop=1&mute=1`;
}
