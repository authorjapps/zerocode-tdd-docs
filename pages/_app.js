import React, { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure it runs only on the client side

        const script1 = document.createElement("script");
        script1.innerHTML = `
          window.project_id = "c617a643c2004572b225b4";
          window.frame_type = "widget";
        `;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://app.getodin.ai/loader.min.js";
        script2.setAttribute("project_id", "c617a643c2004572b225b4");
        script2.setAttribute("frame_type", "widget");
        script2.defer = true;
        document.body.appendChild(script2);

        const COPY_SUCCESS_TIMEOUT = 2000;

        const copySvg = `
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    `;

        const tickSvg = `
                        <svg width="16px" height="16px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#22b322" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        fill="#B4B4B8"/></svg>
                    `;

        function createCopyButtonFor(block) {
        try {
            if (!block || block.dataset.copyAttached === "true") return;
            const pre = block.querySelector("pre");
            const code =
            block.querySelector("pre > code") || block.querySelector("code");
            if (!pre || !code) return;

            if (!pre.style.position || pre.style.position === "")
            pre.style.position = "relative";

            if (pre.querySelector("button[data-copy-btn]")) {
            block.dataset.copyAttached = "true";
            return;
            }

            const btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.setAttribute("aria-label", "Copy Code Snippet");
            btn.setAttribute("title", "Copy Code Snippet");
            btn.dataset.copyBtn = "true";
            btn.innerHTML = copySvg;

            btn.style.position = "absolute";
            btn.style.right = "7px";
            btn.style.top = "10px";
            btn.style.zIndex = "1";
            btn.style.border = "1px solid rgba(0,0,0,0.06)";
            btn.style.padding = "8px";
            btn.style.backdropFilter = "blur(8px)";
            btn.style.cursor = "pointer";
            btn.style.fontSize = "14px";
            btn.style.borderRadius = "10px";
            btn.style.boxShadow = "inset 0 0 0 1.2px rgba(0,0,0,0.04)";
            btn.style.background = "rgba(255,255,255,0.6)";
            btn.style.display = "flex";
            btn.style.alignItems = "center";
            btn.style.justifyContent = "center";

            let timeoutId = null;

            async function doCopy() {
            const text = code.innerText || code.textContent || "";
            if (!text) return;
            let ok = false;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                ok = true;
                } else {
                const ta = document.createElement("textarea");
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                ok = document.execCommand("copy");
                document.body.removeChild(ta);
                }
            } catch (e) {
                console.warn("copy failed", e);
            }

            if (ok) {
                btn.innerHTML = tickSvg;
                btn.setAttribute("aria-label", "Copied");
                btn.setAttribute("title", "Copied");
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                btn.innerHTML = copySvg;
                btn.setAttribute("aria-label", "Copy Code Snippet");
                btn.setAttribute("title", "Copy Code Snippet");
                }, COPY_SUCCESS_TIMEOUT);
            } else {
                btn.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-4px)" },
                    { transform: "translateX(4px)" },
                    { transform: "translateX(0)" },
                ],
                { duration: 300 }
                );
            }
            }

            btn.addEventListener("click", doCopy);
            btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                doCopy();
            }
            });

            pre.appendChild(btn);
            block.dataset.copyAttached = "true";
        } catch (err) {
            console.error("Error attaching copy button", err);
        }
        }

        function attachToAll() {
        document
            .querySelectorAll(".nextra-code-block")
            .forEach(createCopyButtonFor);
        }

        attachToAll();

        const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type === "childList" && m.addedNodes.length) {
            attachToAll();
            break;
            }
        }
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            mo.disconnect();
        };
    }, []);

    return (
        <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
            <Component {...pageProps} />
        </>
    );
};

export default App;
