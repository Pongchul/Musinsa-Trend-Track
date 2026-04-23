interface Props {
    trend: 'up' | 'down';
}

const TrendLine = ({ trend }: Props) => {
    const color = trend === 'up' ? '#3b82f6' : '#ef4444';

    const upPath = 'M 0 28 C 10 24, 20 20, 30 18 C 40 16, 50 14, 60 8';
    const downPath = 'M 0 8 C 10 12, 20 18, 30 20 C 40 22, 50 26, 60 30';

    return (
        <svg width="64" height="36" viewBox="0 0 64 36" fill="none">
            <path
                d={trend === 'up' ? upPath : downPath}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
};

export default TrendLine;
