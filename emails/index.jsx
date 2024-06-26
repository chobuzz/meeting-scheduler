import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
  : 'https://google.com';

export const Email = ({ name, date, url, location, duration, meetingName }) => {
  return (
    <Html>
      <Head />
      <Preview>Buzz-scheduler Email</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row>
              <Img
                src={'https://i.ibb.co/YtyGXZr/Untitled-design.png'}
                alt='emailHeader'
                objectFit='cover'
                width='100%'
                height='100%'
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Hi {name},
                </Heading>
                <Heading
                  as='h2'
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Your meeting successfully scheduled!!
                </Heading>

                <Text style={paragraph}>
                  <b>Meeting Name: {meetingName}</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Date: {date} </b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Duration: {duration}min </b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: {location} </b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>MeetingUrl: {url} </b>
                </Text>

                <Text style={paragraph}>
                  If this was you, there's nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasn't you or if you have additional questions, please
                  see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: '0' }}>
              <Column
                style={containerButton}
                colSpan={2}
              >
                <Link href={baseUrl}>
                  <Button style={button}>Check My Schedule</Button>
                </Link>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2024 | Buzz-Scheduler
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: '#e00707',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  padding: '12px 30px',
  cursor: 'pointer',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
