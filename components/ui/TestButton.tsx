interface Props {
  children: React.ReactChild;
}

export default function TestButton({ children }: Props) {
  console.log('normal button was re-rendered');
  return <button className="bg-sky-400 rounded-md text-white p-4">{children}</button>;
}
