---
'@rn-primitives/portal': patch
---

Fix `PortalHost` scrambling the remaining portals when one portal unmounts. Portals were rendered as a keyless fragment, so React reconciled them by array position: removing a portal slid every later portal onto its predecessor's component instances, silently transferring state between same-type portals (e.g. two bottom sheets or dialogs) and remounting diverging ones. Each portal's subtree is now keyed by its portal name, making removals local to the removed portal.
