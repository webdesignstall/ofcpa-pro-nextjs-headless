// components/CalendlyEmbed.js
import { InlineWidget } from 'react-calendly';

const CalendlyEmbed = () => {
  return (
    <div className="calendly-embed">
      <InlineWidget url="https://calendly.com/jonyahmed19/30min" />
    </div>
  );
};

export default CalendlyEmbed;
