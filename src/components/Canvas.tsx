import React, { useRef, useState, useEffect } from 'react';
import { Button,  Box, Typography } from '@mui/material';
import { UploadFile, RestartAlt, CheckCircle, Crop, Download } from '@mui/icons-material';
import { styled } from '@mui/system';
import gallery from  '../images/gallery.png'

interface Point {
  x: number;
  y: number;
}

const distance = (point1: Point, point2: Point) => {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
};

const UploadContainer = styled(Box)({
  backgroundColor: '#25282C',
  border: '3px dotted #fff',
  padding: '10px',
  height:'550px',
  borderRadius:'10px',
  minWidth: '695px',
  margin:'10px'
});

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas && imageSrc) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;

        if (points.length > 0) {
          context.beginPath();
          context.moveTo(points[0].x, points[0].y);
          points.forEach((point, index) => {
            if (index > 0) {
              context.lineTo(point.x, point.y);
            }
          });
          if (!isDrawing && points.length > 2) {
            context.closePath();
          }
          context.stroke();
        }
      };
    }
  }, [points, isDrawing, imageSrc]);

  const handleCanvasClick = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      const newPoint = { x, y };
      if (isDrawing && points.length > 0 && distance(points[0], newPoint) < 10) {
        setPoints([...points, points[0]]);
        setIsDrawing(false);
      } else {
        setPoints([...points, newPoint]);
        setIsDrawing(true);
      }
    }
  };
  
  const handleCompleteClick = () => {
    if (points.length > 2) {
      setPoints([...points, points[0]]);
      setIsDrawing(false);
    }
  };

  const handleExportClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'roof-drawing.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      
    }
  };

  const handleCropClick = async () => {
    const canvas = canvasRef.current;
    if (canvas && points.length > 2) {
      const clonedCanvas = document.createElement('canvas');
      const clonedContext = clonedCanvas.getContext('2d');
      clonedCanvas.width = canvas.width;
      clonedCanvas.height = canvas.height;

      // Draw the image on the cloned canvas
      const image = new Image();
      image.src = imageSrc!;
      await new Promise((resolve) => {
        image.onload = () => {
          clonedContext?.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(null);
        };
      });

      // Create a mask
      if (clonedContext) {
        clonedContext.globalCompositeOperation = 'destination-in';
        clonedContext.beginPath();
        clonedContext.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
          clonedContext.lineTo(point.x, point.y);
        });
        clonedContext.closePath();
        clonedContext.fill();

        // Reset the composite operation
        clonedContext.globalCompositeOperation = 'source-over';

        // Crop the area
        const croppedCanvas = document.createElement('canvas');
        const croppedContext = croppedCanvas.getContext('2d');
        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;
        croppedContext?.drawImage(clonedCanvas, 0, 0);

        // Create the download link
        const link = document.createElement('a');
        link.download = 'cropped-roof.png';
        link.href = croppedCanvas.toDataURL('image/png');
        link.click();
        alert("Cropped image saved in local")
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setPoints([]);
        setIsDrawing(false);
      };
      reader.readAsDataURL(file);
    }
  };
return (
<>
  {!imageSrc && (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <UploadContainer>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',marginTop: '4%', width: '100%' }}>
            <img src ={gallery} height="150" width="150" alt="Upload"></img>
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<UploadFile />}
              style={{ marginTop: '80px' ,width:'250px' , borderRadius:'5px' , marginLeft:'10px',height:'60px'}}
            >
              Upload Image
            </Button>
          </label>
       
          <Typography variant="body1" align="center" style={{marginTop:'20px' , color:'#C8C9CA'}}>
            Supported formats: JPEG , PNG , SVG , JPG
          </Typography>
        </div>
      </UploadContainer>
      <div style={{marginLeft:'100px',  minWidth: '500px'}}>   <Typography variant="h4" style={{ color:'#C8C9CA'}}>
      Draw lines around the edges  to form a closed 2d geometry.
        </Typography>
         <Typography variant="h6" style={{ color:'#C8C9CA' , marginTop:'10px'}}>
        Export the image, with the drawing, as an image.
        </Typography>
</div>
    </div>
  )}
  {imageSrc && (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        style={{ border: '2px solid white', maxWidth: '780px' , marginBottom:'10px' ,  cursor: 'crosshair'}}
      />
      <Box mt={2} display="flex" justifyContent="center" flexDirection="column" style={{border:'1px solid white',marginLeft:'120px',padding:'10px', borderRadius:'10px'}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { setPoints([]); setIsDrawing(false); }}
          startIcon={<RestartAlt />}
          style={{  width:'280px',borderRadius:'10px',margin:'10px' }}        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompleteClick}
          startIcon={<CheckCircle />}
          style={{  width:'280px',borderRadius:'10px',margin:'10px' }}        >
          Complete
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleExportClick}
          startIcon={<Download />}
          style={{  width:'280px',borderRadius:'10px',margin:'10px' }}        >
          Export Drawing
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleCropClick}
          startIcon={<Crop />}
          style={{  width:'280px',borderRadius:'10px',margin:'10px' }}        >
          Export Cropped Area
        </Button>
      </Box>
      </div>
  )}
</>

  );
  
};

export default Canvas;
