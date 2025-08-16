def patch_agent(agent):
    """
    Monkey-patch agent's LLM/tool call methods for runtime protection.
    For demo: patch 'run' method if exists, log before/after, block if 'block' in input.
    """
    orig_run = getattr(agent, 'run', None)
    if orig_run:
        def patched_run(*args, **kwargs):
            prompt = args[0] if args else kwargs.get('prompt', '')
            print(f"[MCPGuard] Checking prompt: {prompt}")
            if 'block' in str(prompt).lower():
                print("[MCPGuard] Threat detected: blocking call!")
                raise Exception("Blocked by MCPGuard policy.")
            result = orig_run(*args, **kwargs)
            print(f"[MCPGuard] Call completed. Result: {result}")
            return result
        agent.run = patched_run
        print("[MCPGuard] Agent 'run' method patched.")
    else:
        print("[MCPGuard] No 'run' method found to patch.")
