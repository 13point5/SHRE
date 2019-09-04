import json
import random as rand

class BTrie:

    def __init__(self):
        self.btrie = {}


    def load_dict(self, data_filepath):
        with open(data_filepath, 'r') as file:
            for line in file.readlines():
                self.btrie.add_word(line.rstrip("\n")) # assuming one word in each line


    def save_to(self, dest_filepath):
        with open(dest_filepath, 'w') as file:
            json.dump(self.btrie, file)


    def load_trie(self, data_filepath):
        with open(data_filepath, 'r') as file:
            self.btrie = json.load(file)


    def pprint(self):
        print(json.dumps(self.btrie, indent=4))


    def add_word(self, word):

        first_char = word[0]
        word_len = len(word)

        if first_char not in self.btrie:
            self.btrie[first_char] = {'end': False}

        if word_len == 1:
            self.btrie[first_char]['end'] = True
        else:
            tmp = self.btrie[first_char]

            for idx in range(1, word_len):
                curr_char = word[idx]

                if curr_char not in tmp:
                    tmp[curr_char] = {'end': False}

                if idx == word_len - 1:
                    tmp[curr_char]['end'] = True

                tmp = tmp[curr_char]


    def longest_prefix(self, word):
        first_char = word[0]
        word_len = len(word)

        if first_char not in self.btrie:
            return None

        tmp = self.btrie[first_char]
        prefix = first_char
        curr_char = first_char
        idx = 0

        for idx in range(1, word_len):
            curr_char = word[idx]
            if curr_char in tmp:
                tmp = tmp[curr_char]
                prefix += curr_char
            else:
                break

        return prefix, tmp, idx


    def get_next_chars(self, tmp):
        next_choices = list(tmp.keys())
        del next_choices[next_choices.index('end')]
        return next_choices


    def complete_word(self, prefix, tmp, idx):

        next_choices = self.get_next_chars(tmp)

        random = rand.SystemRandom()

        while not tmp['end']:
            next = random.choice(next_choices)
            prefix += next
            next_choices = self.get_next_chars(tmp[next])
            tmp = tmp[next]

        return prefix, idx


    def encrypt(self, msg):

        cipher = []
        msg_len = len(msg)

        while msg_len > 0:
            prefix, tmp, idx = self.longest_prefix(msg)
            word, idx = self.complete_word(prefix, tmp, idx)
            if idx==0:
                idx=1
            cipher.append((word, idx))
            msg = msg[idx:]
            msg_len -= len(prefix)

        return cipher


    def decrypt(self, cipher):

        msg = ''
        for word, idx in cipher:
            msg += word[:idx]

        return msg



trie = BTrie()
trie.load_trie('trie1.json')
word = 'hjkjhiijsnocoderankithgghjk'

cipher = trie.encrypt(word)

cipher_text = ''
for w, idx in cipher:
    cipher_text += w + ' '

print("Plain text =>", word)
print("Cipher text =>", cipher_text)
print("Decrypted text =>", trie.decrypt(cipher))
