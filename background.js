// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired with the user accepts the input in the omnibox.
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
 // chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen');
});