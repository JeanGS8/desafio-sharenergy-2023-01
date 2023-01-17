import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_usuario'})
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @Column({length: 100, nullable: false})
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @Column({length: 100, nullable: false})
  password: string;
}