
interface PowerBIEmbedProps {
  embedUrl: string;
  height?: string;
  title?: string;
}

export const PowerBIEmbed = ({ embedUrl, height = "600px", title = "Power BI Report" }: PowerBIEmbedProps) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white">
      <iframe
        title={title}
        width="100%"
        height={height}
        src={embedUrl}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
