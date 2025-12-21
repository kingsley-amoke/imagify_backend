# Image Processing Mobile App - Project Guide

## Project Overview
A mobile application for image processing with three core features: format conversion, image resizing, and image compression. Built with Flutter for the frontend and NestJS for the backend API.

## Architecture

### Tech Stack
- **Frontend**: Flutter (Dart)
- **Backend**: NestJS (TypeScript/JavaScript)
- **Image Processing**: Sharp (Node.js) / ImageMagick
- **Storage**: Local filesystem (temporary files)
- **API Communication**: REST API with multipart/form-data

### System Flow
```
User uploads image → Flutter app → NestJS API → Image processing → Return processed image → Display/Download
```

## Backend (NestJS)

### Project Structure
```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── image/
│   │   ├── image.module.ts
│   │   ├── image.controller.ts
│   │   ├── image.service.ts
│   │   └── dto/
│   │       ├── convert.dto.ts
│   │       ├── resize.dto.ts
│   │       └── compress.dto.ts
│   └── common/
│       └── filters/
│           └── http-exception.filter.ts
├── uploads/
├── package.json
└── tsconfig.json
```

### Key Dependencies
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/platform-fastify": "^10.0.0",
    "sharp": "^0.33.0",
    "multer": "^1.4.5-lts.1",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

### API Endpoints

#### 1. Convert Image Format
**POST** `/image/convert`
- **Body**: multipart/form-data
  - `image`: File
  - `format`: string (jpg, png, webp, gif, bmp, tiff)
- **Response**: Processed image file

#### 2. Resize Image
**POST** `/image/resize`
- **Body**: multipart/form-data
  - `image`: File
  - `width`: number (optional)
  - `height`: number (optional)
  - `maintainAspectRatio`: boolean
- **Response**: Resized image file

#### 3. Compress Image
**POST** `/image/compress`
- **Body**: multipart/form-data
  - `image`: File
  - `quality`: number (1-100)
  - `format`: string (optional)
- **Response**: Compressed image file

### Image Processing Service Features
- Support for formats: JPEG, PNG, WebP, GIF, BMP, TIFF
- Quality control (1-100)
- Aspect ratio preservation
- File size validation (max 10MB)
- Automatic cleanup of temporary files
- Error handling for unsupported formats

## Frontend (Flutter)

### Project Structure
```
frontend/
├── lib/
│   ├── main.dart
│   ├── models/
│   │   └── image_model.dart
│   ├── services/
│   │   └── api_service.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   ├── convert_screen.dart
│   │   ├── resize_screen.dart
│   │   └── compress_screen.dart
│   ├── widgets/
│   │   ├── image_picker_widget.dart
│   │   ├── format_selector.dart
│   │   ├── quality_slider.dart
│   │   └── result_preview.dart
│   └── utils/
│       ├── constants.dart
│       └── helpers.dart
├── pubspec.yaml
└── android/ios/ (platform specific)
```

### Key Dependencies
```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  image_picker: ^1.0.4
  path_provider: ^2.1.1
  dio: ^5.3.3
  permission_handler: ^11.0.1
  gallery_saver: ^2.3.2
```

### UI/UX Design

#### Home Screen
- Three main action cards:
  1. Convert Format
  2. Resize Image
  3. Compress Image
- Clean, minimalist design
- Material Design 3 components

#### Feature Screens
**Convert Screen:**
- Image picker
- Format dropdown (JPG, PNG, WebP, GIF, BMP, TIFF)
- Convert button
- Preview area

**Resize Screen:**
- Image picker
- Width input field
- Height input field
- "Maintain aspect ratio" toggle
- Resize button
- Preview area

**Compress Screen:**
- Image picker
- Quality slider (1-100)
- Original/compressed size comparison
- Compress button
- Preview area

### State Management
Use Provider or Riverpod for simple state management:
- Loading states
- Error handling
- Image data
- Processing results

## Implementation Plan

### Phase 1: Backend Setup (Day 1-2)
1. Initialize NestJS project
2. Set up Sharp for image processing
3. Implement convert endpoint
4. Implement resize endpoint
5. Implement compress endpoint
6. Add file validation and error handling
7. Test all endpoints with Postman

### Phase 2: Flutter App Setup (Day 3-4)
1. Initialize Flutter project
2. Set up project structure
3. Create API service layer
4. Implement image picker functionality
5. Create home screen with navigation

### Phase 3: Feature Implementation (Day 5-7)
1. Implement Convert screen
2. Implement Resize screen
3. Implement Compress screen
4. Add result preview and save functionality
5. Implement error handling and loading states

### Phase 4: Testing & Polish (Day 8-9)
1. End-to-end testing
2. UI/UX refinements
3. Performance optimization
4. Add image caching
5. Handle edge cases

### Phase 5: Deployment (Day 10)
1. Backend deployment (Heroku, Railway, or DigitalOcean)
2. Update Flutter app with production API URL
3. Build Android APK/iOS IPA
4. Final testing

## Key Considerations

### Security
- File size limits (10MB default)
- File type validation
- CORS configuration
- Rate limiting (optional)
- Input sanitization

### Performance
- Async image processing
- Streaming responses for large files
- Memory management
- Temporary file cleanup
- Connection timeout handling

### Error Handling
- Network errors
- Invalid file formats
- Processing failures
- Storage errors
- User-friendly error messages

## Environment Variables

### Backend (.env)
```
PORT=3000
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
ALLOWED_ORIGINS=http://localhost:*
```

### Flutter (config.dart)
```dart
class Config {
  static const String apiBaseUrl = 'http://localhost:3000';
  static const int maxFileSize = 10 * 1024 * 1024; // 10MB
}
```

## Testing Strategy

### Backend Tests
- Unit tests for image service
- Integration tests for API endpoints
- File upload tests
- Error handling tests

### Frontend Tests
- Widget tests for screens
- Integration tests for user flows
- API service mock tests
- Image picker tests

## Deployment

### Backend Options
1. **Railway**: Easy Node.js deployment
2. **Heroku**: Free tier available
3. **DigitalOcean App Platform**: Scalable option
4. **AWS EC2**: More control

### Frontend Distribution
1. **Android**: Build APK/AAB for Play Store
2. **iOS**: Build IPA for App Store
3. **TestFlight**: Beta testing for iOS

## Future Enhancements
- Batch processing
- Image filters (grayscale, blur, sharpen)
- Image rotation
- Crop functionality
- Image format info display
- Processing history
- Cloud storage integration
- User accounts for saved preferences
