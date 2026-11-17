package com.rahat.humayun;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private static final String HOME = "file:///android_asset/www/index.html";
    private WebView web;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        createWebView();
    }

    private void createWebView() {
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0B0E18"));
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);              // হাইলাইট/বুকমার্ক/সেটিং এখানে সেভ হয়
        // অ্যাপের সব ফাইল assets-এ; ফোনের ফাইল সিস্টেম/কনটেন্ট অ্যাক্সেস বন্ধ রাখা নিরাপদ
        // (file:///android_asset এতে প্রভাবিত হয় না)
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setAllowFileAccessFromFileURLs(false);
        s.setAllowUniversalAccessFromFileURLs(false);
        s.setTextZoom(100);                        // সিস্টেম ফন্ট স্কেল যেন লেআউট না ভাঙে
        s.setMediaPlaybackRequiresUserGesture(true);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                String u = r.getUrl().toString();
                if (u.startsWith("file:///android_asset/")) return false; // অ্যাপের নিজের পেজ
                open(u);          // বাইরের লিংক ব্রাউজারে; অ্যাপের পেজ কখনো বদলায় না
                return true;
            }

            // রেন্ডারার প্রসেস মরে গেলে (মেমরি কম হলে) পুরো অ্যাপ ক্র্যাশ না করে পেজ আবার লোড হবে
            @Override
            public boolean onRenderProcessGone(WebView v, RenderProcessGoneDetail d) {
                if (web != null) {
                    ViewGroup parent = (ViewGroup) web.getParent();
                    if (parent != null) parent.removeView(web);
                    web.destroy();
                    web = null;
                }
                createWebView();
                return true;
            }
        });
        web.addJavascriptInterface(new Bridge(), "Android");
        web.loadUrl(HOME);
    }

    private void open(String url) {
        try {
            Uri u = Uri.parse(url);
            String sc = u.getScheme();
            if (sc == null) return;
            if (!(sc.equals("http") || sc.equals("https") || sc.equals("mailto"))) return;
            startActivity(new Intent(Intent.ACTION_VIEW, u));
        } catch (Exception ignored) {}
    }

    class Bridge {
        @JavascriptInterface public void vibrate(int ms) {
            try {
                Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator())
                    v.vibrate(VibrationEffect.createOneShot(Math.max(1, Math.min(ms, 100)), VibrationEffect.DEFAULT_AMPLITUDE));
            } catch (Exception ignored) {}
        }
        @JavascriptInterface public void keepScreenOn(final boolean on) {
            runOnUiThread(() -> {
                if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }
        @JavascriptInterface public void setBars(final boolean dark) {
            runOnUiThread(() -> {
                if (web == null) return;
                int c = Color.parseColor(dark ? "#0B0E18" : "#F5EFE3");
                getWindow().setStatusBarColor(c);
                getWindow().setNavigationBarColor(c);
                web.setBackgroundColor(c);
                View d = getWindow().getDecorView();
                int f = d.getSystemUiVisibility();
                if (dark) f &= ~(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
                else f |= (View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
                d.setSystemUiVisibility(f);
            });
        }
        @JavascriptInterface public void copy(final String t) {
            runOnUiThread(() -> {
                try {
                    ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("backup", t));
                } catch (Exception ignored) {}
            });
        }
        @JavascriptInterface public void share(final String t) {
            runOnUiThread(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_SEND);
                    i.setType("text/plain");
                    i.putExtra(Intent.EXTRA_TEXT, t);
                    startActivity(Intent.createChooser(i, null));
                } catch (Exception ignored) {}
            });
        }
        @JavascriptInterface public void openUrl(final String u) { runOnUiThread(() -> open(u)); }
    }

    @Override
    public void onBackPressed() {
        if (web == null) { finish(); return; }
        web.evaluateJavascript("window.__back&&window.__back()", r -> {
            if (!"true".equals(r)) finish();
        });
    }

    @Override protected void onPause() {
        super.onPause();
        if (web != null) {
            // পড়ার অবস্থান ব্যাকগ্রাউন্ডে যাওয়ার আগেই সেভ করে নিই
            web.evaluateJavascript("window.__save&&window.__save()", null);
            web.onPause();
        }
    }
    @Override protected void onResume() { super.onResume(); if (web != null) web.onResume(); }

    @Override protected void onDestroy() {
        if (web != null) {
            ViewGroup parent = (ViewGroup) web.getParent();
            if (parent != null) parent.removeView(web);
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }
}
