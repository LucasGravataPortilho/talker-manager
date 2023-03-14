const express = require('express');
const peopleRoutes = require('./routes/peopleRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(express.json());

app.use('/talker', peopleRoutes);
app.use('/login', loginRoutes);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
