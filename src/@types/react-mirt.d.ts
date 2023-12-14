declare module "react-mirt" {
    interface MirtProps {
        className?: string;
        style?: React.CSSProperties;
        file: File | null;
        onChange?: ({ start, current, end }: { start: number; current: number; end: number }) => void;
        onAudioLoaded?: (audio: HTMLAudioElement) => void;
        onWaveformLoaded?: () => void;
        onError?: (error: Error) => void;
        start?: number;
        end?: number;
        options?: MirtOptions;
    }

    interface MirtOptions {
        showButton: boolean;
        waveformColor: string;
        waveformBlockWidth: number;
        waveformBarWidth: number;
        waveformLoading: boolean;
        fineTuningDelay: number;
        fineTuningScale: number;
    }

    export const Mirt: React.FC<ReactMirtProps>;
}