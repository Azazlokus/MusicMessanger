import React, { useRef, useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../Provider/useAuth';
import './MusicPlayer.css';
import { Icon } from '@iconify/react';

interface MusicFile {
    name: string;
    url: string;
}

const MusicPlayer: React.FC = () => {
    const audioElementRef = useRef<HTMLAudioElement>(null);
    const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
    const { user, base } = useAuth();

    useEffect(() => {
        const fetchMusicFiles = async () => {
            if (user && user._id) {
                const userDataRef = doc(base, 'users', user._id);
                const userDataSnapshot = await getDoc(userDataRef);

                if (userDataSnapshot.exists()) {
                    const userData = userDataSnapshot.data();
                    if (userData?.music) {
                        setMusicFiles(userData.music);
                    }
                }
            }
        };

        fetchMusicFiles();
    }, [user, base]);

    const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const musicFile: MusicFile = {
                name: file.name,
                url: fileURL,
            };

            if (user && user._id) {
                const userRef = doc(base, 'users', user._id);
                const newMusicFiles = [...musicFiles, musicFile];

                await updateDoc(userRef, {
                    music: newMusicFiles,
                });

                setMusicFiles(newMusicFiles);
            }
        }
    };

    const handleDelete = async (index: number) => {
        if (user && user._id) {
            const userRef = doc(base, 'users', user._id);
            const updatedMusicFiles = [...musicFiles];
            updatedMusicFiles.splice(index, 1);

            await updateDoc(userRef, {
                music: updatedMusicFiles,
            });

            setMusicFiles(updatedMusicFiles);
        }
    };

    const handlePlay = (url: string) => {
        if (audioElementRef.current) {
            audioElementRef.current.src = url;
            audioElementRef.current.play();
        }
    };

    const handlePause = () => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
        }
    };

    const handleStop = () => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
        }
    };

    return (
        <div className={'music__player'}>
            <div className={'music__player_controls'}>
                <button className={'music__pause'} onClick={handlePause}>
                    Пауза
                </button>
                <button className={'music__play'} onClick={handleStop}>
                    Остановить
                </button>
                <audio ref={audioElementRef} controls />
            </div>

            <input className={'input__music'} type="file" accept="audio/wav" onChange={handleMusicUpload} />

            <div className="music__file_container">
                {musicFiles.map((musicFile, index) => (
                    <div className={'music__file'} key={index}>
                        <div
                            className={'music__file-name'}
                            onClick={() => handlePlay(musicFile.url)}
                        >
                            {musicFile.name}
                        </div>
                            <Icon className={'music__file-delete'} onClick={() => handleDelete(index)} icon="icon-park-outline:delete" color="red" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicPlayer;



