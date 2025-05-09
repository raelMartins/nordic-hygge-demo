import {useState, useEffect} from 'react';

// Custom hook to listen for changes in localStorage
const useLocalStorage = key => {
  const isArray = Array.isArray(key);
  const [value, setValue] = useState(() => {
    // Get initial value from localStorage
    if (typeof window !== 'undefined') {
      let storedValue;
      if (isArray) {
        storedValue = {};

        key.forEach(key => {
          const item = localStorage.getItem(key);

          if (typeof item === 'string') {
            try {
              const parsedValue = JSON.parse(item);

              storedValue[key] = parsedValue;
            } catch (error) {
              storedValue[key] = item;
            }
          } else {
            storedValue[key] = item;
          }
        });
      } else {
        const item = localStorage.getItem(key);

        if (typeof item === 'string') {
          try {
            storedValue = JSON.parse(item);
          } catch (error) {
            storedValue = item;
          }
        } else {
          storedValue = item;
        }
      }
      return storedValue;
    }
    return null;
  });

  useEffect(() => {
    // Function to handle changes in localStorage
    const handleChange = () => {
      let storedValue;

      if (isArray) {
        storedValue = {};

        key.forEach(key => {
          const item = localStorage.getItem(key);
          if (typeof item === 'string') {
            try {
              const parsedValue = JSON.parse(item);

              storedValue[key] = parsedValue;
            } catch (error) {
              storedValue[key] = item;
            }
          } else {
            storedValue[key] = item;
          }
        });
      } else {
        const item = localStorage.getItem(key);

        if (typeof item === 'string') {
          try {
            storedValue = JSON.parse(item);
          } catch (error) {
            storedValue = item;
          }
        } else {
          storedValue = item;
        }
      }

      setValue(
        storedValue
        // JSON.parse(localStorage.getItem(key))
      );
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleChange);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleChange);
    };
  }, [key]);

  useEffect(() => {}, []);

  // Function to set value to localStorage
  const setLocalStorage = (key, newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, newValue);
      try {
        if (isArray) {
          setValue(prevValues => ({
            ...prevValues,
            [key]: newValue ? JSON.parse(newValue) : '',
          }));
        } else {
          setValue(newValue ? JSON.parse(newValue) : '');
        }
      } catch (err) {
        console.log('error');
      }
    }
  };

  return [value, setLocalStorage];
};

export default useLocalStorage;
