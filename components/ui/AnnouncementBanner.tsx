interface Props {
  content: string;
}

export default function AnnouncementBanner({ content }: Props) {
  return (
    <div className="bg-brand-yellow px-6 py-2.5 w-full">
      <div
        suppressHydrationWarning
        className="text-center text-[10px] md:text-sm font-normal text-black
                   [&_p]:inline [&_p]:m-0
                   [&_strong]:font-bold [&_strong]:text-black
                   [&_a]:underline [&_a]:text-blue-900 [&_a]:hover:text-blue-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
