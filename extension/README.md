# Firefox Extension

This version does NOT create an iframe.

The content script creates a normal fixed DOM container directly on the Amazon page and loads the local React bundle.

Build the React extension bundle first, then copy the generated files into `extension/assets/` before loading the extension in Firefox.
