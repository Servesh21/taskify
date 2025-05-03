// Backend/config/passport.js

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import  pool from '../db/index.js';  // assuming you have your PostgreSQL pool setup
import cookieParser from 'cookie-parser';

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies.token,  // Custom extractor for cookies
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

export default function(passport) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find user from the payload (assuming you're using userId in the payload)
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);
        const user = result.rows[0];

        if (user) {
          return done(null, user);  // User found
        } else {
          return done(null, false);  // User not found
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
