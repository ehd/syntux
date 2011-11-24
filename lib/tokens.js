var util  = require('util');
var Token = require('./token');

module.exports = Tokens;
function Tokens(properties) {
  this.ast    = null;
  this.first  = null;
  this.last   = null;
  this.length = 0;
}

Tokens.prototype.prepend = function() {
  throw new Error('Implement me');
};

Tokens.prototype.append = function(token) {
  token = new Token(token, this);

  if (!this.first) this.first = token;

  if (this.last) {
    this.last.next = token;
    token.prev = this.last;
  }

  this.last = token;

  this.length++;

  return token;
};

Tokens.prototype.insertBefore = function(ref, token) {
  token = new Token(token, this);

  if (ref === this.first) {
    this.first = token;
    token.prev = null;
  } else {
    token.prev    = ref.prev;
    ref.prev.next = token;
  }

  ref.prev = token;
  token.next = ref;
};

Tokens.prototype.insertAfter = function(ref, token) {
  token = new Token(token, this);

  if (ref === this.last) {
    this.last  = token;
    token.next = null;
  } else {
    token.next    = ref.next;
    ref.next.prev = token;
  }

  ref.next   = token;
  token.prev = ref;
};

Tokens.prototype.remove = function(ref) {
  if (ref === this.first) this.first = ref.next;
  if (ref === this.last) this.last = ref.prev;

  ref.prev.next = ref.next;
  ref.next.prev = ref.prev;
};

Tokens.prototype.toString = function() {
  var source = '';
  var token  = this.first;

  do{
    source += token.value;
  } while(token = token.next)

  return source;
};

Tokens.prototype.inspect = function() {
  var tokens = [];
  var token  = this.first;

  do{
    tokens.push(token);
  } while(token = token.next)

  return util.inspect(tokens);
};