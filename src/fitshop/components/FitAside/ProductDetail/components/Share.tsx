import React from "react";
import Switch from "@material-ui/core/Switch";

interface ShareProps {
  data?: {
    shareFacebook?: boolean;
    shareTwitter?: boolean;
    sharePinterest?: boolean;
    shareYoutube?: boolean;
    shareInstagram?: boolean;
  };
  onChange: any;
}

const Share: React.FC<ShareProps> = ({
  data: {
    shareFacebook,
    shareTwitter,
    sharePinterest,
    shareYoutube,
    shareInstagram
  },
  onChange
}) => {
  return (
    <div className="module-info border-bottom-1px">
      <div className="t16 pl-16 pb-16">社交媒体</div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          Facebook Link
          <Switch
            checked={shareFacebook || false}
            color="primary"
            name="title_uppercase"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("shareFacebook", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          Twitter Link
          <Switch
            checked={shareTwitter || false}
            color="primary"
            name="title_uppercase"
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={e => {
              onChange("shareTwitter", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          Pinterest Link
          <Switch
            checked={sharePinterest || false}
            color="primary"
            name="title_uppercase"
            onChange={e => {
              onChange("sharePinterest", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          Youtube Link
          <Switch
            checked={shareYoutube || false}
            color="primary"
            name="title_uppercase"
            onChange={e => {
              onChange("shareYoutube", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="module__item">
        <div className="t14 mb-8 title-only-one-row">
          Instagram Link
          <Switch
            checked={shareInstagram || false}
            color="primary"
            name="title_uppercase"
            onChange={e => {
              onChange("shareInstagram", e.target.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Share;
