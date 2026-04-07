import sys
import json
import asyncio
from holehe import core

async def analyze_email(email):
    try:
        out = []
        # Use holehe to check email across various platforms
        # holehe uses modules to check if an email exists on sites like twitter, instagram, etc.
        modules = core.import_submodules("holehe.modules")
        
        # We'll just check a few popular ones for speed in this example
        # In a real tool, you'd check all or allow user selection
        results = await core.main(email, out, modules)
        
        # Format results
        hits = []
        for res in out:
            if res['exists']:
                hits.append({
                    "name": res['name'],
                    "domain": res['domain'],
                    "method": res['method']
                })
        
        return {
            "email": email,
            "hits": hits,
            "hit_count": len(hits)
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        email_addr = sys.argv[1]
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_loop(analyze_email(email_addr))
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "No email provided"}))
