import './styles.css';

type SimpleMessageProps = {
  message: string;
  type: 'error' | 'warn' | 'success';
};

const returnCorrectColor = (type: string): string => {
  const colors: Record<string, string> = {
    error: '#ff5053',
    warn: '#ffffa0',
    success: '#1dc584',
  };

  return colors[type];
};

const SimpleMessage = ({ message, type }: SimpleMessageProps) => {
  return (
    <div
      className="simple-message"
      style={{ background: returnCorrectColor(type) }}
    >
      {message}
    </div>
  );
};

export default SimpleMessage;
