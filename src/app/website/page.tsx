"use client"
import { useState, useRef } from "react";
import Container from "@/components/Container";
import { useUploadVideoMutation, useDeleteVideoMutation, useGetAllVideosQuery } from "../backups/api/backupsApis";
import Cookies from "js-cookie";

const Website = () => {
    const token = Cookies.get('token') || "";
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // API hooks
    const [uploadVideo, { isLoading: isUploading }] = useUploadVideoMutation();
    const [deleteVideo] = useDeleteVideoMutation();
    const { data: videosData, isLoading: isVideosLoading, refetch } = useGetAllVideosQuery(token);
    
    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a video file first");
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            
            await uploadVideo({ token, formData }).unwrap();
            
            // Reset state and refetch videos
            setSelectedFile(null);
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            refetch();
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };
    
    const handleDelete = async (videoId: any) => {       
        try {
            setDeletingId(videoId);
            await deleteVideo({ token, id: videoId }).unwrap();
            refetch();
        } catch (error) {
            console.error("Error deleting video:", error);
        } finally {
            setDeletingId(null);
        }
    };
    
    const videos = videosData?.data || [];

    return (
        <Container className="px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Video Management</h2>
                
                <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Upload New Video</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="video/*"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                        <button
                            onClick={handleUpload}
                            disabled={isUploading || !selectedFile}
                            className={`px-4 py-2 rounded-md text-white font-medium ${
                                isUploading || !selectedFile 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isUploading ? 'Uploading...' : 'Upload Video'}
                        </button>
                    </div>
                    
                    {isUploading && (
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
                        </div>
                    )}
                    
                    {selectedFile && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Selected file: <span className="font-medium">{selectedFile.name}</span> ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
                    
                    {isVideosLoading ? (
                        <p className="text-gray-600">Loading videos...</p>
                    ) : videos.length === 0 ? (
                        <p className="text-gray-600">No videos uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video: any) => (
                                <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <video 
                                        src={video.videoUrl} 
                                        controls 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-3 flex justify-between items-center">
                                        <span className="text-sm text-gray-500 truncate">ID: {video.id.substring(0, 8)}...</span>
                                        <button
                                            onClick={() => handleDelete(video.id)}
                                            disabled={deletingId === video.id}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            {deletingId === video.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Website;