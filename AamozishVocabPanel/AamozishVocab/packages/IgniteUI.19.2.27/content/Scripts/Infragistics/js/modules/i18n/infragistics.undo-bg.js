/*!@license
* Infragistics.Web.ClientUI infragistics.undo.js resources 19.2.20192.315
*
* Copyright (c) 2011-2020 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/
(function(factory){if(typeof define==="function"&&define.amd){define([],factory)}else{factory()}})(function(){$=$||{};$.ig=$.ig||{};$.ig.locale=$.ig.locale||{};$.ig.locale.bg=$.ig.locale.bg||{};$.ig.locale.bg.undo=$.ig.locale.bg.undo||{};var l=$.ig.locale.bg.undo;l["AddItemDescription"]="\u0414\u043e\u0431\u0430\u0432\u0438 '{1}'";l["AddItemDescriptionDetailed"]="\u0414\u043e\u0431\u0430\u0432\u0438 '{1}'";l["AddRangeDescription"]="\u0414\u043e\u0431\u0430\u0432\u0438 {1} {2}";l["AddRangeDescriptionDetailed"]="\u0414\u043e\u0431\u0430\u0432\u0438 {1} {2}";l["FallbackTransactionDescription"]="";l["LE_AddOpenTransaction"]="Cannot add an UndoTransaction that has not been opened or is still open.";l["LE_AddTransactionDirect"]="UndoTransaction cannot be added. The RootTransaction is automatically added upon Commit.";l["LE_AddUnitWhileTransactionOpen"]="Cannot add an UndoUnit while the transaction contains a nested open transaction '{0}'.";l["LE_ArgumentIsNegative"]="The '{0}' must be 0 or greater. Actual value: '{1}'";l["LE_CannotExecuteOpenTransaction"]="Cannot invoke Execute while the transaction '{0}' is open.";l["LE_ChangeHistoryInMerge"]="Cannot alter the Undo/Redo history while a Merge is being invoked";l["LE_ChangeHistoryInRemoveAll"]="Cannot alter the Undo/Redo history while the RemoveAll is being invoked.";l["LE_ChildTransactionNotInUnits"]="The specified child transaction '{0}' is not part of the Units of this transaction.";l["LE_ClosingOtherTransaction"]="The specified transaction '{0}' is not the currently open transaction '{1}'.";l["LE_EndTransactionWhileSuspended"]="Cannot close a transaction while the UndoManager is suspended.";l["LE_EnumEnded"]="The enumerator was completed.";l["LE_EnumFailedVersion"]="The collection was modified after the enumerator was started.";l["LE_EnumNotStarted"]="The enumerator was not started. Call MoveNext.";l["LE_FactoryNullTransaction"]="The UndoUnitFactory returned a null UndoTransaction.";l["LE_HasOpenTransaction"]="A transaction has already been opened.";l["LE_HistoryItemNotInCurrentHistory"]="The UndoHistoryItem does not exist within the associated Undo or Redo history in the UndoManager.";l["LE_InvalidTransactionOwner"]="The specified transaction's Owner is not this object.";l["LE_NeedAddRemoveAction"]="The specified action must be 'Add' or 'Remove'.";l["LE_NewTransactionWhileSuspended"]="A transaction cannot be started while the UndoManager is suspended.";l["LE_RangeCollectionAction"]="Range actions are not supported.";l["LE_ReferenceNotRegistered"]="The specified reference '{0}' has not been registered with an UndoManager instance. Use the RegisterReference method to register the reference with an UndoManager or pass null as the 'reference' to use the UndoManager.Current thread static/shared instance.";l["LE_ReferenceRegisteredToOther"]="The specified reference '{0}' is registered with a different UndoManager instance.";l["LE_RemoveAllFailedVersion"]="The collection was modified during the call to RemoveAll.";l["LE_ResetCollectionAction"]="Reset action is not supported.";l["LE_TargetCollectionIsReadOnly"]="The specified collection '{0}' cannot be read-only.";l["LE_TransactionAlreadyOpened"]="The transaction has already been opened.";l["LE_TransactionClosed"]="The transaction cannot be modified once it has been closed.";l["LE_TransactionNotOpened"]="The specified transaction '{0}' is not open.";l["LE_TransactionNotStarted"]="The transaction cannot be modified until it has been started.";l["LE_UndoManagerAsReference"]="An 'UndoManager' instance cannot be a reference.";l["LE_UndoRedoInRollback"]="Cannot perform an Undo/Redo while a Rollback is in progress.";l["LE_UndoRedoInTransaction"]="Cannot perform an undo/redo while a transaction is opened.";l["LE_UndoRedoInUndoRedo"]="Cannot perform an Undo/Redo while an Undo/Redo is in progress.";l["LE_UndoRedoWhileSuspended"]="Cannot perform an Undo/Redo while the UndoManager has been suspended.";l["MoveItemDescription"]="\u041f\u0440\u0435\u043c\u0435\u0441\u0442\u0438 '{1}\u2019";l["MoveItemDescriptionDetailed"]="\u041f\u0440\u0435\u043c\u0435\u0441\u0442\u0438 '{1}' \u043e\u0442 '{2}' \u043d\u0430 '{3}'";l["PropertyChangeDescription"]="\u041f\u0440\u043e\u043c\u0435\u043d\u0438 '{0}' \u043d\u0430 '{1}'";l["PropertyChangeDescriptionDetailed"]="\u041f\u0440\u043e\u043c\u0435\u043d\u0438 '{0}' \u043d\u0430 '{1}' \u043d\u0430 '{3}'";l["ReinitializeCollectionDescription"]="\u041f\u0430\u043a\u0435\u0442\u043d\u0430 \u043f\u0440\u043e\u043c\u044f\u043d\u0430 \u043d\u0430 '{2}'";l["ReinitializeCollectionDescriptionDetailed"]="\u041f\u0430\u043a\u0435\u0442\u043d\u0430 \u043f\u0440\u043e\u043c\u044f\u043d\u0430 \u043d\u0430 '{2}'";l["RemoveItemDescription"]="\u041f\u0440\u0435\u043c\u0430\u0445\u043d\u0438 '{1}\u2019";l["RemoveItemDescriptionDetailed"]="\u041f\u0440\u0435\u043c\u0430\u0445\u043d\u0438 '{1}\u2019";l["RemoveRangeDescription"]="\u041f\u0440\u0435\u043c\u0430\u0445\u043d\u0438 {1} {2}";l["RemoveRangeDescriptionDetailed"]="\u041f\u0440\u0435\u043c\u0430\u0445\u043d\u0438 {1} {2}";l["ReplaceItemDescription"]="\u0417\u0430\u043c\u0435\u043d\u0438 '{1}\u2019";l["ReplaceItemDescriptionDetailed"]="\u0417\u0430\u043c\u0435\u043d\u0438 '{1}\u2019 \u0441 '{2}'";$.ig.undo=$.ig.undo||{};$.ig.undo.locale=$.ig.undo.locale||l;return l});