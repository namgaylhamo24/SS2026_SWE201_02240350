# Student Productivity App — Report

Idea: A lightweight student productivity app with planner, timers, and quick access to assignments.

Navigation flow:
- Bottom tabs: Home, Categories, Animate, Profile.
- Stack: Main tabs -> Detail screen for items.

Animations implemented:
- Fade + slide animation on the `Detail` screen mount (uses `Animated.timing` + `Animated.spring`).
- Gesture-driven draggable circle in the `Animation Demo` screen (uses `PanResponder` and `Animated.ValueXY`).

Reusable components:
- `Card` used on the Home screen to list items.

Files of interest:
- `src/navigation/*` — navigation setup.
- `src/screens/*` — screen implementations.
- `report.md` — this file.
