export const checkForAvailableLink = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fetch(url, { method: 'HEAD' })
      .then((response) => {
        resolve(response.ok);
      })
      .catch(() => {
        resolve(false);
      });
  });
}

export const checkForAvailableLinkSync = (url: string): boolean => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();
    return xhr.status === 200;
  } catch {
    return false;
  }
}

export const checkForAvailableLinkAsync = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
