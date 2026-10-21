#!/usr/bin/env python3
"""Serve the three website versions locally.

    python serve.py [port]

Then open the printed URLs. No dependencies beyond the standard library.
"""
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print("Serving %s\n" % ROOT)
        for v in ("V0", "V1", "V2"):
            if os.path.isdir(os.path.join(ROOT, v)):
                print("  %s: http://127.0.0.1:%d/%s/" % (v, PORT, v))
        print("\nCtrl+C to stop.")
        httpd.serve_forever()
