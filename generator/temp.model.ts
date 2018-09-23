import * as mongoose from 'mongoose';

export interface <%= interfaceName %> extends mongoose.Document {
  
}

export const <%= name %>Schema: mongoose.Schema = new mongoose.Schema({
  
});

export const <%= name %>: mongoose.Model<<%= interfaceName %>> = mongoose.model('<%= name %>', <%= name %>Schema);
