import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Font,
} from "react-email";




interface PasswordResetEmailProps {
  companyName?: string;
  url?: string;
  userName?: string;
}

const PasswordResetEmail = ({
  companyName,
  url,
  userName,
}: PasswordResetEmailProps) => (
  <Tailwind>
    <Html>
      <Head>
        <title>Password Reset Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Body className=" m-0 text-center font-sans ">
        <Preview>Reset your password</Preview>
        <Container className="mt-0 mx-auto sm:mt-8 w-full max-w-160 ">
          <Section className="bg-white px-2 sm:px-6 py-4 rounded-md">
            <Section className="rounded-t-lg bg-gray-900/90 px-6 py-4">
              <Text className="text-4xl text-white m-0 text-center font-sans">
                {companyName}
              </Text>
            </Section>

            <Section className="bg-zinc-300/95 rounded-b-lg  px-6 sm:px-8 py-8 sm:py-10">
              <Text className="text-black text-2xl">
                Hello{" "}
                <span className="text-blue-700">
                  {" "}
                  <a href={`mailto:${userName}`} className="underline">
                    {userName}
                  </a>
                </span>
                !
              </Text>
              <Section className="mb-3">
                <Heading as="h1" className="text-3xl font-semibold leading-snug tracking-tight text-[#14171E]  m-0 font-sans ">
                  Reset your password
                </Heading>
              </Section>

              <Text className="text-base font-normal  text-[#43454B] mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
                Someone has requested a link to change your password, and you
                can do this through the link below.
              </Text>

              <Section className="mb-6 text-center">
                <Button
                  href={url}
                  target="_blank"
                  className="bg-indigo-600 text-white hover:bg-indigo-800 text-lg font-semibold rounded-xl px-6 py-4 hover:cursor-pointer"
                >
                  Change my password
                </Button>
              </Section>

              <Text className="text-[15px]/normal font-[450] text-[#7B7D81] mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
                If you didn&apos;t request this, please ignore this email. Your
                password won&apos;t change until you access the link above and
                create a new one.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default PasswordResetEmail;
