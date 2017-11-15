# Notes

- added test coverage task in npm script
- added REMOVE_ITEM action and action creator
- added deep-freeze in tests to avoid state mutation in reducers
- used selectors inside connected components to mapStateToProps so that state structure changes in future won't affect UI components
- added ability to add task on key Enter (Submit) for brevity
- added TOGGLE_ITEM action and action creator
- filters are added in a separate reducer
- added TOGGLE_FILTER action and action creator
- added travis ci integration

