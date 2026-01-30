---
title: States
description: Action states in Vue Modeler
---

# States

Each action can be in one of five states:

| State   | Description                    | Property   |
|---------|--------------------------------|------------|
| Ready   | Ready to run or finished OK    | `isReady`  |
| Pending | Currently running              | `isPending` |
| Error   | Finished with error            | `isError`, `error` |
| Abort   | Was cancelled                  | `isAbort`, `abortReason` |
| Lock    | Locked, cannot run            | `isLock`   |

All properties are reactive and read-only. Use them in templates to show loading, errors, or disable buttons. See [Action — State](/guides/action#state).
