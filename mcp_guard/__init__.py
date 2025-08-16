import os
from .patch import patch_agent
from .proxy import ProxyClient

def protect(agent):
    """
    Protects the given agent by monkey-patching its LLM/tool calls.
    If MCPGUARD_AUTO is set, routes calls via local proxy instead.
    """
    if os.environ.get("MCPGUARD_AUTO", "").lower() == "true":
        print("[MCPGuard] Passive proxy mode enabled via MCPGUARD_AUTO.")
        ProxyClient().patch_agent(agent)
    else:
        patch_agent(agent)
