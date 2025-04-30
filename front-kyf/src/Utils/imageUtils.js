export const convertToGrayscale = (imageFile) => {
    return new Promise((resolve, reject) => {
      // Criar um objeto de imagem
      const img = new Image();
      
      img.onload = () => {
        // Criar o canvas e configurar as dimensões para a imagem
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Desenhar a imagem no canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
  
        // Obter os dados da imagem (pixels)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        // Converter para escala de cinza
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          
          // Calcular o valor de cinza
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
  
          // Definir os valores RGB do pixel para o valor de cinza
          pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
        }
  
        // Atualizar os dados da imagem no canvas
        ctx.putImageData(imageData, 0, 0);
  
        // Converter o canvas de volta para uma URL de imagem
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
  
      img.onerror = (err) => reject(err);
  
      // Criar um URL para o arquivo de imagem
      const objectURL = URL.createObjectURL(imageFile);
      img.src = objectURL;
    });
  };
  