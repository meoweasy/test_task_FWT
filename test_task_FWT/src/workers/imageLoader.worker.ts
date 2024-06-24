// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

const loadImage = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  return { imageUrl, blobUrl };
};

ctx.addEventListener('message', async (event) => {
  const { src } = event.data;
  const result = await loadImage(src);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  postMessage({
    result,
  });
});
