import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CharacterStats from "./subcomponents/StatList";

interface HomeProps {}
const Home: FC<HomeProps> = (props) => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        width={1}
        columns={{ md: 2, xs: 1 }}
        padding={2}
        spacing={2}
      >
        <Grid item md={2} xs={1}>
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
            }}
          >
            <CharacterStats />
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Card variant="outlined">
            <CardHeader title="Character" />
            <CardContent>
              <Typography>
                Class, level, skill point allocation and more.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="edit-character">
                edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1}>
          <Card variant="outlined">
            <CardHeader title="Equipment" />
            <CardContent>
              <Typography>Weapon, units, and augments.</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="edit-equipment">
                edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1}>
          <Card variant="outlined">
            <CardHeader title="Food" />
            <CardContent>
              <Typography>
                Cook the perfect meal for your Meteorn.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="edit-food">
                edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
