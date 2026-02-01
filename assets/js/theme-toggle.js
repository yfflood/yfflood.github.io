/**
 * Theme Toggle for Dark Mode
 * Handles theme switching, localStorage persistence, and system preference detection
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'theme';
  var DARK_THEME = 'dark';
  var LIGHT_THEME = 'light';

  /**
   * Get the current theme from the document
   */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
  }

  /**
   * Set the theme on the document and optionally save to localStorage
   */
  function setTheme(theme, save) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute('data-theme', DARK_THEME);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    if (save) {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    updateToggleButton();
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    var currentTheme = getCurrentTheme();
    var newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme, true);
  }

  /**
   * Update the toggle button's aria-label based on current theme
   */
  function updateToggleButton() {
    var button = document.getElementById('theme-toggle');
    if (button) {
      var currentTheme = getCurrentTheme();
      var label = currentTheme === DARK_THEME ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
    }
  }

  /**
   * Initialize the theme toggle functionality
   */
  function init() {
    // Set up toggle button click handler
    var button = document.getElementById('theme-toggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
    }

    // Update button state
    updateToggleButton();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
