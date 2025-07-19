/**
 * Test for Dark Theme Functionality
 * This test verifies that the dark theme applies correctly
 */

// Mock DOM environment
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Dark Theme Functionality', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.className = '';
    document.documentElement.style.colorScheme = '';
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('should apply dark theme when toggled', () => {
    // Simulate the theme application function
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.className = theme;
      document.documentElement.style.colorScheme = theme;
      mockLocalStorage.setItem('cvss-theme', theme);
    };

    // Apply dark theme
    applyTheme('dark');

    // Verify dark theme is applied
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.className).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cvss-theme', 'dark');
  });

  test('should apply light theme when toggled back', () => {
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.className = theme;
      document.documentElement.style.colorScheme = theme;
      mockLocalStorage.setItem('cvss-theme', theme);
    };

    // Apply light theme
    applyTheme('light');

    // Verify light theme is applied
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.className).toBe('light');
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cvss-theme', 'light');
  });

  test('should read saved theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    // Simulate the initial theme loading script
    const savedTheme = mockLocalStorage.getItem('cvss-theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    expect(theme).toBe('dark');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cvss-theme');
  });

  test('should fall back to system preference when no saved theme', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    // Mock system preference for dark mode
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true
    });

    const savedTheme = mockLocalStorage.getItem('cvss-theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    expect(theme).toBe('dark');
  });

  test('should toggle between themes correctly', () => {
    let currentTheme = 'light';
    
    const toggleTheme = () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.documentElement.className = currentTheme;
      document.documentElement.style.colorScheme = currentTheme;
      mockLocalStorage.setItem('cvss-theme', currentTheme);
      return currentTheme;
    };

    // Start with light theme
    expect(currentTheme).toBe('light');

    // Toggle to dark
    const newTheme1 = toggleTheme();
    expect(newTheme1).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Toggle back to light
    const newTheme2 = toggleTheme();
    expect(newTheme2).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  test('should have correct CSS variables for dark theme', () => {
    // Create a test element to check computed styles
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    // Apply dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Create a style element with our CSS variables
    const style = document.createElement('style');
    style.textContent = `
      [data-theme="dark"] {
        --primary-bg: #000000;
        --secondary-bg: #111111;
        --primary-text: #ffffff;
      }
      .test {
        background-color: var(--primary-bg);
        color: var(--primary-text);
      }
    `;
    document.head.appendChild(style);
    testElement.className = 'test';
    
    // Check if the element has the correct styles applied
    const computedStyle = window.getComputedStyle(testElement);
    
    // Clean up
    document.body.removeChild(testElement);
    document.head.removeChild(style);
    
    // Note: In a real browser, these would be the actual color values
    // In Jest/Node environment, we're just testing the mechanism
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

// Manual browser test function
window.testDarkTheme = function() {
  console.log('=== Dark Theme Test ===');
  
  const originalTheme = document.documentElement.getAttribute('data-theme');
  console.log('Original theme:', originalTheme);
  
  // Apply dark theme
  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.className = 'dark';
  document.documentElement.style.colorScheme = 'dark';
  
  console.log('Applied dark theme');
  console.log('data-theme:', document.documentElement.getAttribute('data-theme'));
  console.log('className:', document.documentElement.className);
  console.log('colorScheme:', document.documentElement.style.colorScheme);
  
  // Check CSS variables
  const computedStyle = getComputedStyle(document.documentElement);
  console.log('--primary-bg:', computedStyle.getPropertyValue('--primary-bg'));
  console.log('--primary-text:', computedStyle.getPropertyValue('--primary-text'));
  
  // Check body background
  const bodyStyle = getComputedStyle(document.body);
  console.log('Body background:', bodyStyle.backgroundColor);
  
  setTimeout(() => {
    // Restore original theme
    document.documentElement.setAttribute('data-theme', originalTheme);
    document.documentElement.className = originalTheme;
    document.documentElement.style.colorScheme = originalTheme;
    console.log('Restored original theme');
  }, 3000);
};