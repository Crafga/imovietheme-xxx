import { writeFile, mkdir, unlink, chmod } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

export async function saveBase64Image(
	base64Data: string,
	fileName: string,
	folder: string = 'uploads'
): Promise<string> {
	try {
		// Extract the actual base64 data (remove data:image/...;base64, prefix)
		const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
		if (!matches) {
			throw new Error('Invalid base64 image format');
		}

		const imageType = matches[1]; // jpeg, png, etc.
		const base64Content = matches[2];

		// Create filename with extension and timestamp to avoid cache issues
		const fileExtension = imageType === 'jpeg' ? 'jpg' : imageType;
		const timestamp = Date.now();
		const fullFileName = `${fileName}_${timestamp}.${fileExtension}`;

		// Create directory path - use absolute path for production
		const uploadDir = path.resolve(process.cwd(), 'static', folder);
		const filePath = path.join(uploadDir, fullFileName);

		console.log('Attempting to save file to:', filePath);
		console.log('Upload directory:', uploadDir);

		// Create directory if it doesn't exist
		// if (!existsSync(uploadDir)) {
		// 	console.log('Creating directory:', uploadDir);
		// 	await mkdir(uploadDir, { recursive: true });
		// }

		try {
			await mkdir(uploadDir, { recursive: true, mode: 0o755 });
			await chmod(uploadDir, 0o755);
		} catch (error) {
			console.log('Cannot create in static/uploads, trying uploads in app root:', error);
			// Fallback to uploads directory in app root
			// uploadDir = join(process.cwd(), 'uploads');
			// staticPath = '/uploads/';
			try {
				if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
				// await mkdir(uploadDir, { recursive: true, mode: 0o755 });
				// await chmod(uploadDir, 0o755);
			} catch (fallbackError) {
				console.error('Failed to create uploads directory:', fallbackError);
			}
		}

		// Convert base64 to buffer and save file
		const buffer = Buffer.from(base64Content, 'base64');
		await writeFile(filePath, new Uint8Array(buffer));

		// Verify file was created
		if (!existsSync(filePath)) {
			throw new Error('File was not created successfully');
		}

		console.log('File saved successfully:', filePath);

		// Return the public path (without 'static/' prefix)
		return `/${folder}/${fullFileName}`;
	} catch (error) {
		console.error('Error saving image:', error);
		throw new Error(`Failed to save image file: ${error}`);
	}
}

export async function deleteFile(filePath: string): Promise<void> {
	try {
		const fullPath = path.resolve(process.cwd(), 'static', filePath.replace(/^\//, ''));
		if (existsSync(fullPath)) {
			await unlink(fullPath);
			console.log('Deleted old file:', fullPath);
		}
	} catch (error) {
		console.error('Error deleting file:', error);
	}
}

export async function deleteOldFiles(fileName: string, folder: string = 'uploads'): Promise<void> {
	try {
		const { readdir } = await import('fs/promises');
		const uploadDir = path.resolve(process.cwd(), 'static', folder);
		
		if (!existsSync(uploadDir)) {
			return;
		}

		const files = await readdir(uploadDir);
		const oldFiles = files.filter(file => file.startsWith(`${fileName}_`));
		
		for (const file of oldFiles) {
			const filePath = path.join(uploadDir, file);
			await unlink(filePath);
			console.log('Deleted old file:', filePath);
		}
	} catch (error) {
		console.error('Error deleting old files:', error);
	}
}
