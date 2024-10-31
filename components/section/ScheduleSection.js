// components/CalendlyEmbed.js
import { InlineWidget } from 'react-calendly';

const CalendlyEmbed = () => {
  return (
      <>
          <div id="booking">
              {/*<div className="calendly-embed">
              <InlineWidget url="https://calendly.com/jonyahmed19/30min"/>
          </div>*/}
              {/*style="width: 100%;border:none;overflow: hidden;"*/}
              <iframe src="https://link.conversionpro.io/widget/booking/Y8yBZ09JEkpgFA9Ymfpa"
                      style={{width: '100%', border: 'none', overflow: 'hidden'}}  scrolling="no" id="msgsndr-calendar"></iframe>
              <br/>
              <script src="https://link.conversionpro.io/js/embed.js" type="text/javascript"></script>
          </div>

      </>

  )
      ;
};

export default CalendlyEmbed;
