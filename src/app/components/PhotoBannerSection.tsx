const photo =
  "https://www.figma.com/api/mcp/asset/e4846410-7b2f-4c27-a485-ddbbdfde257f";

export default function PhotoBannerSection() {
  return (
    <section className="w-full h-[565px] md:h-[900px] overflow-hidden">
      <img
        src={photo}
        alt=""
        aria-hidden={true}
        className="w-full h-full object-cover object-[40%_center] md:object-center"
      />
    </section>
  );
}
