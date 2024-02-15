import themeColor from "@/components/constant/color";
import Layout from "@/components/design/layout";
import { Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Privacy() {
  return (
    <Layout banner>
      <Grid
        mt={5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container maxWidth={"lg"}>
          <Grid px={3} item md={12}>
            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              MEDCON Conferences and Exhibitions
            </Typography>

            <Typography paragraph>
              Established at United Arab Emirates (“us”, “we”, or “our”)
              operates{" "}
              <Link href={"https://rak-diabetes-conference.com/"}>
                https://rak-diabetes-conference.com/
              </Link>{" "}
              (the “Site”) as well as a messaging platform for the efficient and
              convenient operation via the Site, email, SMS, or MMS (the
              “Service”). Data security of medical professionals attending our
              programs, visiting our websites and using our educational services
              is of crucial importance. This Privacy Policy informs you of our
              policies regarding the collection, usage and disclosure of
              personal information we receive from users of the Site or Service.
              We use your personal information only for providing the Service
              and improving the Site. By using the Site or Service, you agree to
              the collection and use of information in accordance with this
              policy
            </Typography>
            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              Information Collection and Use
            </Typography>

            <Typography paragraph>
              While using our Site or Service, we may ask you to provide us with
              certain personally identifiable information that can be used to
              contact or identify you. Personally, identifiable information may
              include, but is not limited to your name, email address, mobile
              phone numbers, professional title, specialty, work address (es,
              username, password, and other information you provide us
              (&apos;Personal Information&apos;). MEDCON Conferences &
              Exhibitions processes your personal data because you use our
              services and/or because you provide them yourself. Below is an
              overview of the personal data that we may process depending on the
              interaction with MEDCON like:
            </Typography>
            <ul>
              <li>
                <Typography paragraph>
                  Information provided related to participation in educational
                  programs
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Information provided related to online registrations on
                  websites or programs
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Information provided as faculty member to our educational
                  programs MEDCON Conferences & Exhibitions minimizes
                  distribution of personal data to the best of our abilities
                  with a limited number of third parties only if this is
                  necessary for the execution of the agreement, as well as to
                  comply with any legal obligation. With companies that process
                  data in our assignment, we conclude a data processing
                  agreement to ensure a consistent level of security and
                  confidentiality of your data. MEDCON Conferences & Exhibitions
                  remains responsible for these processing operations. We only
                  do this with your express permission. Your personal
                  information will be treated confidentially by MEDCON
                  Conferences& Exhibition and not used for other purposes or
                  given to third parties unless: MEDCON Conferences& Exhibitions
                  is required to do so;
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  you explicitly request it; this is necessary to send you
                  publications, marketing materials, reference materials or
                  other information.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  you register for conferences or events organized by third
                  parties; these third parties are other MEDCON entities.
                </Typography>
              </li>
            </ul>
            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              For what purpose and on what basis we process personal data
            </Typography>
            <Typography paragraph>
              MEDCON Conferences & Exhibitions collects and processes data about
              customers and visitors to this website in order to improve its
              operations, raise awareness about and supply services which may be
              of interest to you, as well as compiling internet statistics. If
              necessary, the information you supply will be used to contact you
              to inform you about updates such as changes in the functionality
              of the website or to offer you services which may be of interest
              to you (unless you have indicated that you do not wish to receive
              updates about programs and/or services).
            </Typography>
            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              MEDCON processes your personal data for the following purposes:
            </Typography>
            <ul>
              <li>
                <Typography paragraph>Sending newsletter.</Typography>
              </li>
              <li>
                <Typography paragraph>
                  Being able to call or email you if this is necessary to carry
                  out our services.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Informing you about changes to our services.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Giving you the opportunity to create an account.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  MEDCON analyses behaviour on the website in order to improve
                  the website and adapt the range of products and services to
                  your preferences.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  MEDCON also processes personal data if we are legally obliged
                  to do so, such as data that we need for our tax return.
                </Typography>
              </li>
            </ul>
            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              View, modify or delete data
            </Typography>

            <Typography paragraph>
              You have the right to view, correct or delete your personal data.
              In addition, you have the right to withdraw your consent to data
              processing or to object to the processing of your personal data by
              our company and you have the right to data transferability. This
              means that you can submit a request to us to send your personal
              data, held by us, in a computer file to you or another
              organization specified by you.
            </Typography>

            <Typography variant="subtitle1" fontWeight={"bold"} gutterBottom>
              Changes to this policy
            </Typography>
            <Typography paragraph>
              We may update this Privacy Policy. We will notify you of any
              changes by posting the new Privacy Policy on the Site. You are
              advised to review this Privacy Policy periodically for any
              changes.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Privacy;
