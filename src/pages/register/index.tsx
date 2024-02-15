import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import { post } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import { AccountType } from "@/types/props.types";
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

type MemberType = { value: string; label: string; code: boolean };

const memberTypes = [
  { value: "EHS Staff", label: "EHS Staff", code: true },
  { value: "Non EHS Attendee", label: "Non EHS Attendee", code: false },
];
const specialities = [
  { value: "Endocrinologist", label: "Endocrinologist" },
  { value: "Cardiologist", label: "Cardiologist" },
  { value: "Pediatrician", label: "Pediatrician" },
  { value: "Internal Medicine", label: "Internal Medicine" },
  { value: "Family Medicine", label: "Family Medicine" },
  { value: "General Practitioner", label: "General Practitioner" },
  { value: "Diabetes Educator", label: "Diabetes Educator" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Nutritionist", label: "Nutritionist" },
  { value: "Diabetologist", label: "Diabetologist" },
  { value: "Nurse", label: "Nurse" },
  { value: "Family Physician", label: "Family Physician" },
  { value: "Industry", label: "Industry" },
  { value: "Internist", label: "Internist" },
  { value: "Neurologist", label: "Neurologist" },
  { value: "Nephrologist", label: "Nephrologist" },
  { value: "Other", label: "Other" },
];
const JobTitles = [
  { value: "Consultant", label: "Consultant" },
  { value: "Head Nurse", label: "Head Nurse" },
  { value: "Head of Department", label: "Head of Department" },
  { value: "Medical student", label: "Medical student" },
  { value: "Nurse", label: "Nurse" },
  { value: "Resident", label: "Resident" },
  { value: "Specialist", label: "Specialist" },
  { value: "Others", label: "Others" },
];
const Departments = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Emergency Department", label: "Emergency Department" },
  { value: "Endocrinology", label: "Endocrinology" },
  { value: "Gastroenterology", label: "Gastroenterology" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Inpatient Department", label: "Inpatient Department" },
  { value: "Intensive Care Unit (ICU)", label: "Intensive Care Unit (ICU)" },
  { value: "Neurology", label: "Neurology" },
  { value: "Obstetrics & Gynecology", label: "Obstetrics & Gynecology" },
  { value: "Outpatient Department", label: "Outpatient Department" },
  { value: "Pediatrics", label: "Pediatrics" },
  {
    value: "Surgery Department (Operating Theater)",
    label: "Surgery Department (Operating Theater)",
  },
  { value: "Others", label: "Others" },
];

function Register() {
  const [info, setInfo] = useState<AccountType>({
    id: -1,
    name: "",
    email: "",
    memberType: "",
    phone: "",
    hospital: "",
    bayanati_number: "",
    speciality: "",
    jobTitle: "",
    department: "",
    code: null,
    code_id: -1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [speciality, setSpeciality] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState<any>(null);
  const [department, setDepartment] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [memberType, setMemberType] = useState<MemberType>({
    value: "",
    label: "",
    code: false,
  });
  const [hasCode, setHasCode] = useState(false);
  const [phone, setPhone] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validateForm = () => {
    const { name, email, hospital, code, phone } = info;
    if (name.trim() == "") {
      setError("Your full name is required");
      setOpen(true);
      return false;
    }
    if (email.trim() == "") {
      setError("Your email is required");
      setOpen(true);
      return false;
    }
    if (memberType.value.trim() == "") {
      setError("Member type is required");
      setOpen(true);
      return false;
    }
    if (phone.trim() == "") {
      setError("Your Phone number is required");
      setOpen(true);
      return false;
    }
    if (hospital.trim() == "") {
      setError("Your hospital is required");
      setOpen(true);
      return false;
    }
    if (!speciality) {
      setError("Your speciality is required");
      setOpen(true);
      return false;
    }
    if (!jobTitle) {
      setError("Your Job Title is required");
      setOpen(true);
      return false;
    }
    if (!department) {
      setError("Your Job Title is required");
      setOpen(true);
      return false;
    }
    if (code && code.trim() == "" && memberType.code && hasCode) {
      setError("Your Registration code is required");
      setOpen(true);
      return false;
    }
    return true;
  };

  const login = async () => {
    if (email.trim() != "") {
      setLoading(true);
      let data = {
        email: email,
      };
      try {
        const res = await post(routeConfig.account.login, data, null);
        if (res && res.status_code == 200) {
          auth.setUser({ ...res.data });
          localStorage.setItem("userData", { ...res.data });
          localStorage.setItem("refreshToken", res.data.token);
          localStorage.setItem("accessToken", res.data.token);
          router.replace("/");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Apologies, there seems to be an issue with your details. Please check and try again. Thank you.",
            icon: "error",
          });
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Apologies, there seems to be an issue with your details. Please check and try again. Thank you.",
          icon: "error",
        });
      }
    } else {
      setError("Your email is required");
      setOpen(true);
      return false;
    }
  };

  const submit = async () => {
    if (validateForm()) {
      setLoading(true);
      let data = {
        speciality: speciality.label,
        jobTitle: jobTitle.label,
        department: department.label,
        name: info.name,
        email: info.email,
        member_type: memberType.value,
        phone: info.phone,
        hospital: info.hospital,
        code: "",
        bayanati_number: info.bayanati_number,
      };
      if (info.code) {
        data = {
          ...data,
          code: info.code,
        };
      }
      /*console.log(data);*/
      try {
        const res = await post(routeConfig.account.register, data, null);
        if (res) {
          if (res.status_code === 200 && (hasCode || memberType.code)) {
            auth.setUser({...res.data});
            localStorage.setItem("userData", {...res.data});
            localStorage.setItem("refreshToken", res.data.token);
            localStorage.setItem("accessToken", res.data.token);
            
            Swal.fire({
              title: "Congratulations!",
              text: "Your account has been successfully created",
              icon: "success"
            }).then((result) => {
              router.replace("/");
            });
  
          } else if (res.status_code === 200 && hasCode == false) {
            auth.setUser({...res.data});
            localStorage.setItem("userData", { ...res.data });
            localStorage.setItem("refreshToken", res.data.token);
            localStorage.setItem("accessToken", res.data.token);
            Swal.fire({
              title: "Alsmost there!",
              text: "Your registration is pending. You will be recive payment link shortly. Please check your email to complete the registration. Thank you.",
              icon: "info",
            }).then((result) => {
              router.replace("/");
            });
    
          } else {
            Swal.fire({
              title: "Error!",
              text: "Apologies, there seems to be an issue with your details. Please check and try again. Thank you.",
              icon: "error",
            });
          }
        } else {
          // handle null response 
          console.log(res);
          console.log('No data coming from server');
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Apologies, there seems to be an issue with your details. Please check and try again. Thank you.",
          icon: "error",
        });
      }
    }
  };

  const handleChange = (key: string, value: string) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };

  return (
    <Layout banner>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        color="red"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert variant="filled" severity={"error"} sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Grid
        mb={10}
        mt={5}
        px={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          py={3}
          container
          maxWidth={"lg"}
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
        >
          <Grid item md={6} xs={12} display={"flex"} flexDirection={"column"}>
            <Typography fontWeight={"bold"} variant="h6">
              Registration:
            </Typography>
            <Grid
              mt={2}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              sx={{ maxWidth: 500 }}
            >
              <TextField
                label="Full Name"
                variant="outlined"
                placeholder="Full Name"
                fullWidth
                required
                size="small"
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
              />
              <Autocomplete
                id="JobTitle"
                options={JobTitles}
                value={jobTitle}
                fullWidth
                getOptionLabel={(option) => option.label}
                size="small"
                onChange={(event, value) => {
                  setJobTitle(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Job Title"
                    variant="outlined"
                    required
                  />
                )}
              />
              <Autocomplete
                id="speciality"
                options={specialities}
                value={speciality}
                fullWidth
                getOptionLabel={(option) => option.label}
                size="small"
                onChange={(event, value) => {
                  setSpeciality(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Speciality"
                    variant="outlined"
                    required
                  />
                )}
              />

              <Autocomplete
                id="department"
                options={Departments}
                value={department}
                fullWidth
                getOptionLabel={(option) => option.label}
                size="small"
                onChange={(event, value) => {
                  setDepartment(value);
                  console.log(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Department"
                    variant="outlined"
                    required
                  />
                )}
              />
              <TextField
                label="Hospital / Clinic"
                variant="outlined"
                placeholder="Hospital / Clinic"
                fullWidth
                required
                size="small"
                onChange={(e) => {
                  handleChange("hospital", e.target.value);
                }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                placeholder="+971 50 123 4567"
                fullWidth
                required
                size="small"
                onChange={(e) => {
                  handleChange("phone", e.target.value);
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Email (for EHS Members please use your EHS email)"
                fullWidth
                required
                size="small"
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
              />
              <Autocomplete
                id="Member Type"
                options={memberTypes}
                value={memberType}
                fullWidth
                getOptionLabel={(option) => option.label}
                size="small"
                onChange={(event, value) => {
                  if (value) {
                    setMemberType(value);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Registration category"
                    variant="outlined"
                    required
                  />
                )}
              />
              {!memberType.code && memberType.value === "Non EHS Attendee" && (
                <RadioGroup
                  value={hasCode}
                  onChange={() => setHasCode(!hasCode)}
                  style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="I have a code"
                  />

                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="I don't have a code"
                  />
                </RadioGroup>
              )}
          
              <Grid display={"flex"}>
                {(memberType && memberType.code) || hasCode ? (
                  <TextField
                    label="Registration Code"
                    variant="outlined"
                    placeholder="Registration Code"
                    fullWidth
                    size="small"
                    onChange={(e) => handleChange("code", e.target.value)}
                  />
                ) : null}
              </Grid>
              <TextField
                label="Bayanati Number (For CME)"
                variant="outlined"
                placeholder="Bayanati Number (For CME)"
                fullWidth
                size="small"
                onChange={(e) => {
                  handleChange("bayanati_number", e.target.value);
                }}
              />

              <Grid display={"flex"}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    onClick={submit}
                    sx={{ width: 100 }}
                    variant="contained"
                    color="secondary"
                  >
                    Join
                  </Button>
                )}
              </Grid>
              <Typography
                fontStyle={"italic"}
                color={"error"}
                variant="caption"
              >
                * Indicates required fields
              </Typography>
              <Typography variant="body2" color={themeColor.blue.dark}>
                If you are an EHS staff and don&apos;t have a code, please get
                in touch with us by clicking the link below.
              </Typography>

              <Link href={"/contact"}>Get in touch</Link>
            </Grid>
          </Grid>
          <Grid
            mb={4}
            item
            md={6}
            xs={12}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography fontWeight={"bold"} variant="h6">
              Login with existing account:
            </Typography>
            <Grid
              mt={2}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              sx={{ maxWidth: 500 }}
            >
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Email Address"
                fullWidth
                value={email}
                required
                size="small"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={login}
                  sx={{ width: 100 }}
                  variant="contained"
                  color="secondary"
                >
                  Login
                </Button>
              )}
              <Typography color={themeColor.blue.dark} variant="body2">
                <strong>EHS Staff:</strong> Registration is Free, and
                utilization of an <strong>EHS email address</strong> is
                mandatory for registration.
                <br></br>
                <br></br>
                <strong>Non-EHS Attendees:</strong> A registration fee of{" "}
                <strong>AED 250</strong> applies. Upon registration through the
                CPD section, a <strong>payment link</strong> will be dispatched
                to the provided email address. Payment is required to be settled
                prior to or on the commencement day of the event.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container maxWidth={"lg"} mb={4}>
          <Grid item xs={12}>
            <Typography color={themeColor.blue.dark} variant="caption">
              <b>Disclaimer :</b> We treat your personal data and protect your
              privacy when you use our services. By using our services you agree
              that MEDCON can use such data to contact you for future
              educational activities. This is a personal invitation for one
              invite, and directed to healthcare professionals only. In
              accordance to UAE code of Ethical Practices for the Promotion and
              distribution of medical products, MEA Code of promotional
              practices for pharmaceuticals; spouses, relatives or other guests
              in relation with healthcare professionals cannot be invited or
              included in any promotional, professional or scientific event.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Register;
