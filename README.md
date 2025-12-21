# Image Processor Mobile App

A simple and clean mobile application for image processing with three main features: format conversion, image resizing, and image compression. Built with Flutter (frontend) and NestJS (backend).

## Features

### 🔄 Convert Image Format
Convert images between multiple formats:
- JPEG/JPG
- PNG
- WebP
- GIF
- BMP
- TIFF

### 📐 Resize Image
- Set custom width and height
- Maintain aspect ratio option
- Flexible dimension input (width only, height only, or both)

### 🗜️ Compress Image
- Adjust quality from 1-100%
- See file size comparison (original vs compressed)
- View compression ratio percentage

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Sharp** - High-performance image processing
- **TypeScript** - Type-safe JavaScript

### Frontend
- **Flutter** - Cross-platform mobile framework
- **Dart** - Programming language
- **Dio** - HTTP client
- **Material Design 3** - UI components

## Project Structure

```
image-processor/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── image/
│   │       ├── image.module.ts
│   │       ├── image.controller.ts
│   │       ├── image.service.ts
│   │       └── dto/
│   └── package.json
│
└── frontend/                   # Flutter app
    ├── lib/
    │   ├── main.dart
    │   ├── services/
    │   │   └── api_service.dart
    │   └── screens/
    │       ├── home_screen.dart
    │       ├── convert_screen.dart
    │       ├── resize_screen.dart
    │       └── compress_screen.dart
    └── pubspec.yaml
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create uploads directory:**
```bash
mkdir uploads
```

4. **Start the server:**
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install Flutter dependencies:**
```bash
flutter pub get
```

3. **Update API URL (if needed):**
Edit `lib/services/api_service.dart` and update the `baseUrl`:
```dart
static const String baseUrl = 'http://YOUR_IP:3000'; // Replace with your backend URL
```

For Android emulator, use: `http://10.0.2.2:3000`
For iOS simulator, use: `http://localhost:3000`
For physical device, use your computer's IP address

4. **Run the app:**
```bash
# Check connected devices
flutter devices

# Run on connected device
flutter run

# Or specify a device
flutter run -d <device-id>
```

## API Endpoints

### Convert Image
**POST** `/image/convert`
- **Content-Type:** multipart/form-data
- **Body:**
  - `image` (file): Image file
  - `format` (string): Target format (jpg, png, webp, gif, bmp, tiff)
- **Response:** Converted image file

### Resize Image
**POST** `/image/resize`
- **Content-Type:** multipart/form-data
- **Body:**
  - `image` (file): Image file
  - `width` (number, optional): Target width in pixels
  - `height` (number, optional): Target height in pixels
  - `maintainAspectRatio` (boolean): Whether to maintain aspect ratio
- **Response:** Resized image file

### Compress Image
**POST** `/image/compress`
- **Content-Type:** multipart/form-data
- **Body:**
  - `image` (file): Image file
  - `quality` (number): Compression quality (1-100)
  - `format` (string, optional): Output format
- **Response:** Compressed image file

## Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=3000
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Android Permissions
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS Permissions
Add to `ios/Runner/Info.plist`:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to select images</string>
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos</string>
```

## Testing the API

You can test the API endpoints using curl or Postman:

### Convert Example:
```bash
curl -X POST http://localhost:3000/image/convert \
  -F "image=@/path/to/image.jpg" \
  -F "format=png" \
  --output converted.png
```

### Resize Example:
```bash
curl -X POST http://localhost:3000/image/resize \
  -F "image=@/path/to/image.jpg" \
  -F "width=800" \
  -F "maintainAspectRatio=true" \
  --output resized.jpg
```

### Compress Example:
```bash
curl -X POST http://localhost:3000/image/compress \
  -F "image=@/path/to/image.jpg" \
  -F "quality=60" \
  --output compressed.jpg
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

Deploy to platforms like:
- Railway
- Heroku
- DigitalOcean
- AWS EC2

### Frontend

**Android:**
```bash
flutter build apk --release
# APK location: build/app/outputs/flutter-apk/app-release.apk

# Or build App Bundle for Play Store
flutter build appbundle --release
```

**iOS:**
```bash
flutter build ios --release
# Then open in Xcode for signing and distribution
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in .env or kill the process
lsof -ti:3000 | xargs kill -9
```

**Sharp installation issues:**
```bash
npm rebuild sharp
```

### Frontend Issues

**Dio connection error:**
- Check if backend is running
- Verify the API URL in `api_service.dart`
- For Android emulator, use `10.0.2.2` instead of `localhost`

**Permission denied errors:**
- Ensure permissions are added to AndroidManifest.xml and Info.plist
- Request runtime permissions using permission_handler

**Image picker not working:**
```bash
flutter clean
flutter pub get
```

## Future Enhancements

- [ ] Batch processing multiple images
- [ ] Image filters (grayscale, blur, sharpen, etc.)
- [ ] Image rotation and cropping
- [ ] Processing history
- [ ] Cloud storage integration
- [ ] User accounts and preferences
- [ ] Share processed images directly
- [ ] Before/after comparison slider

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.
